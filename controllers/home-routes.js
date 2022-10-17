const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage', {
      id: 1,
      content: 'test_content',
      title: 'Handlebars Docs',
      created_at: new Date(),
      comments: [{}, {}],
      user: {
        username: 'test_user'
      }
    });
  });
  

module.exports = router;

