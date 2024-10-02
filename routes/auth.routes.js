// routes.js
const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const authorize = require('../auth/authorize');

// Mock Authentication Middleware
// In a real application, replace this with proper authentication
router.use((req, res, next) => {
    // Example user. Change the role to 'admin', 'moderator', or 'user' to test different roles.
    req.user = {
        id: 'user2', // Unique identifier for the user
        role: 'user',

        // id: 'mod1',
        // role: 'moderator'
        
        // id: 'admin1',
        // role: 'admin', // Possible values: 'admin', 'moderator', 'user', or undefined for guest
    };
    next();
  });

// Create an Article
router.post('/articles', authorize('create', 'Article'), async (req, res, next) => {
  try {
    const article = new Article({
      ...req.body,
      authorId: req.user.id, // Assume req.user.id contains the user's ID
    });
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
});

// Read All Articles
router.get('/articles', authorize('read', 'Article'), async (req, res, next) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    next(error);
  }
});

// Read Single Article
router.get('/articles/:id', authorize('read', 'Article'), async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  } catch (error) {
    next(error);
  }
});

// Update an Article
router.put('/articlesOld/:id', authorize('update', 'Article'), async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    // Check additional conditions if necessary (e.g., users cannot update published articles)
    if (article.isPublished && req.user.role === 'user') {
      return res.status(403).json({ error: 'Cannot update published articles' });
    }

    // Update fields
    Object.assign(article, req.body);
    await article.save();
    res.json(article);
  } catch (error) {
    next(error);
  }
});

// Update an Article
router.put('/articles/:id', async (req, res, next) => {
    try {
      const article = await Article.findById(req.params.id);
      if (!article) return res.status(404).json({ error: 'Article not found' });
  
      // **Authorize After Fetching the Article**
      authorize('update', article)(req, res, (err) => {
        if (err) return next(err);
  
        // Whitelist allowed fields to prevent overposting
        const allowedFields = ['title', 'content', 'isPublished'];
        allowedFields.forEach(field => {
          if (req.body[field] !== undefined) article[field] = req.body[field];
        });
  
        article.save()
          .then(updatedArticle => res.json(updatedArticle))
          .catch(next);
      });
    } catch (error) {
      next(error);
    }
  });

// Delete an Article
router.delete('/articlesOld/:id', authorize('delete', 'Article'), async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    await Article.findByIdAndDelete(article);
    
    res.json({ message: 'Article deleted' });
  } catch (error) {
    next(error);
  }
});

// Delete an Article
router.delete('/articles/:id', async (req, res, next) => {
    try {
      const article = await Article.findById(req.params.id);
      if (!article) return res.status(404).json({ error: 'Article not found' });
  
      // **Authorize After Fetching the Article**
      authorize('delete', article)(req, res, (err) => {
        if (err) return next(err);
  
        Article.findByIdAndDelete(article)
          .then(() => res.json({ message: 'Article deleted' }))
          .catch(next);
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
