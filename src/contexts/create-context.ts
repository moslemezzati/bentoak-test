import { createContext, useContext } from "react";

export function createCustomContext<T extends object>() {
  const Context = createContext<T | undefined>(undefined);
	const useCustomContext = () => {
		const _context = useContext(Context);
		if(_context === undefined){
			throw new Error('useCustomContext required parameter!')
		}
		return _context
	}
	return [useCustomContext, Context.Provider] as const
}
