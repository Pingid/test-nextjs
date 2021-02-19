import create, { SetState } from 'zustand/vanilla'
import { combine } from 'zustand/middleware'

type TypeOfState<T> = T extends SetState<infer D> ? D : never

export const mouse = create(
  combine({ x: 0, y: 0 }, (set) => ({
    update: (m: TypeOfState<typeof set>) => set((old) => ({ ...old, ...m })),
  }))
)

export const container = create(
  combine({ w: 0, h: 0, t: 0, l: 0 }, (set) => ({
    update: (m: TypeOfState<typeof set>) => set((old) => ({ ...old, ...m })),
  }))
)

const store = { mouse, container }

export default store
