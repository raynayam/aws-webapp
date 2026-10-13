var Data = {
  current_question: function () {
    var question = null;
    for (var i = 0; i < Data.questions.list.length; i++) {
      if (Data.question_index === Data.questions.list[i].uuid) {
        question = Data.questions.list[i]
        break;
      }
    }
  },

  question_index: null,
  questions: {
    list: [],
    fetch: function () {
      m.request({
        method: "GET",
        url: "/questions",
      })
        .then(function (data) {
          Data.questions.list = data.questions
          Data.question_index = data.question_index
        })
    }
  }
}

var Choice = {
  click: function (n) {
    return function () {
      data.selected = n
    }
  },
  classes: function (n) {
    if (data.selected === n) {
      return 'active'
    } else {
      return ''
    }
  },
  view: function (vnode) {
    var n = vnode.attrs.index
    return m('.choice', {
      class: Choice.classes(n),
      onclick: Choice.click(n)
    },
      m('span.l'),
      m('span.v', data.choices[n])
    )
  }
}

Question = {
  view: function (vnode) {
    if (Data.current_question() === null) { return false }
    m('.question_wrapper', [
      m('.question', data.question),
      m(Choice, { index: 0 }),
      m(Choice, { index: 1 }),
      m(Choice, { index: 2 }),
      m(Choice, { index: 3 })
    ])
  }
}

var App = {
  oninit: Data.questions.fetch(),
  submit: function () {
    m.request({
      method: "PUT",
      url: "/submit",
      params: { selected: data.selected },
    })
      .then(function (data) {
        console.log('data', data)
      })
  },
  view: function () {
    return m('main', [
      m("h1", 'Study Sync'),
      m('article',
        m('h2', 'Question:'),
        m(Question),
        m('.submit',
          m("button", { onclick: App.submit }, 'Submit')
        )
      )
    ])
  }
}

m.mount(document.body, App)
