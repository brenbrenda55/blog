const router = require('express').Router();
const sequelize = require('../config/connection');
const { Content, User, Comment } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
      attributes: [
        'id',
        'content_test',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE content.id)')]
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'content_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbContentData => {
        const content = dbContentData.map(content => content.get({ plain: true }));
  
        res.render('homepage', { content });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  

module.exports = router;

