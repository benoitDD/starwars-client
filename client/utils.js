export function compose(...functions){
	return (...args) => {
		const res = functions.reverse().reduce((acc, f) => (f(acc)), ...args)
		return res
	}
}

export const TOKEN_AUTHENTICATION = 'token'