var Data = {
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
          Data.questions.questions_list = data.question_index
        })
    }
  }
}

var Choice = {
  click: function (n) {
    return function () {
      Data.selected = n
    }
  },
  classes: function (n) {
    if (Data.selected === n) {
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
      m('span.v', Data.choices[n])
    )
  }
}

var App = {
  oninit: Data.questions.fetch(),
  submit: function () {
    m.request({
      method: "PUT",
      url: "/submit",
      params: { selected: Data.selected },
    })
      .then(function (data) {
        console.log('data', data)
        Data.question_index = data.question_index
      })
  },
  view: function () {
    var q = Data.questions.list[Data.question_index]
    return m('main', [
      m("h1", q ? q.title : 'Loading...'),
      m('article',
        m('h2', 'Question:'),
        m('.question', q ? q.question : ''),
        m(Choice, { index: 0 }),
        m(Choice, { index: 1 }),
        m(Choice, { index: 2 }),
        m(Choice, { index: 3 }),
        m('.submit',
          m("button", { onclick: App.submit }, 'Submit')
        )
      )
    ])
  }
}