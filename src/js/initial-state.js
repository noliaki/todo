export const projects = (() => {
  let arr = []
  for (let i = 0, len = 100; i < len; i ++) {
    const date = new Date()
    arr.push({
      id: arr.length,
      name: `Project-${arr.length}`,
      description: `fuga-${arr.length}`,
      createDate: date,
      editDate: date,
      deleteDate: null,
      done: false,
      tasks: []
    })
  }

  return arr
})()

export const tasks = (() => {
  let arr = []
  // for (let i = 0, len = 100; i < len; i ++) {
  //   const date = new Date()
  //   arr.push({
  //     id: arr.length,
  //     name: `TASK-${arr.length}`,
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     createDate: date,
  //     editDate: date,
  //     deleteDate: null,
  //     done: false,
  //     project: null
  //   })
  // }

  return arr
})()
