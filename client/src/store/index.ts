import { StoreApi, UseBoundStore, create } from "zustand"

export type User = {
	id: string
	username: string
	email: string
	bio: string
	firstname: string
	lastname: string
}
type Store = {
	user: User | null
}

type WithSelectors<S> = S extends { getState: () => infer T }
	? S & { use: { [K in keyof T]: () => T[K] } }
	: never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
	let store = _store as WithSelectors<typeof _store>
	store.use = {}
	for (let k of Object.keys(store.getState())) {
		;(store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
	}

	return store
}

type StoreActions = {
	setUser: (user: User | null) => void
}

const store_ = create<Store & StoreActions>()((set) => ({
	user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
	setUser: (user: User | null) => {
		localStorage.setItem("user", JSON.stringify(user))
		set({ user })
	},
}))

export default createSelectors(store_)
