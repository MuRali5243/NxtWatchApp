import React from 'react'

const ReactContext = React.createContext({
  List: [],
  isDarkTheme: false,
  onclick: () => {},
  onclickTheme: () => {},
})
export default ReactContext
