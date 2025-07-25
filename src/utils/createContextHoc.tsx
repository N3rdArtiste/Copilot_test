import React from 'react'
import { Context, createContext, memo, useContext } from 'react'

export function createContextHoc<CP, CV extends {}, R = never>(
  useContextValue: (p: CP, r: R)=> CV,
  context?:        Context<CV>
) {
  const Context = context ?? createContext<CV>(null!)

  return [
    function(Component:  React.FunctionComponent<CV>) {
      return (p: CP, r: R)=> {
        const value = useContextValue(p, r)

        return (
          <Context.Provider value={value}>
            <Component {...value} />
          </Context.Provider>
        )
      }
    },
    ()=> useContext(Context)
  ] as const
}