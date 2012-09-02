var pastes = require('../lib/pastes');

exports.index = function (req, res) {
  var latest = pastes.latest(10);

  var data = {
    title: 'Pasta — Quicky paste or view some text',
    latest: latest,
    hasLatest: !!(latest || false)
  };

  console.log(pastes.latest(10));
  res.render('index', data);
};

exports.paste = function (req, res) {
  if (!req.body.text) {
    res.render('index', {
      title: 'Pasta — Quicky paste or view some text',
      error: 'You didn\'t paste anything!'
    })
  } else {
    var paste = pastes.put({
      title: req.body.title || 'untitled paste',
      text: req.body.text,
      date: new Date().toGMTString()
    });
    res.redirect('view/' + paste.id);
  }
};

exports.view = function (req, res) {
  if (req.params.id) {
    var paste = pastes.get(req.params.id);
    if (paste) {
      res.render('paste', paste);      
    } else {
      res.render('404');
    }
  } else {
    res.redirect('/');
  }
};

exports.viewRaw = function (req, res) {
  var paste = pastes.get(req.params.id);
  if (paste) {
    res.end(paste.text);
  } else {
    redirect('404');
  }
}

exports.notFound = function (req, res) {
  res.render('404');
};