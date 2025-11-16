import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  currentTheme: 'light',
  changeCurrentTheme: () => {},
});

export default function ThemeProvider({children}) {  
  const [theme, setTheme] = useState('light');

  const changeCurrentTheme = (newTheme) => {
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.add('[&_*]:!transition-none');
    
       // Force remove dark class
    document.documentElement.classList.remove('dark');
    // Force light color scheme
    document.documentElement.style.colorScheme = 'light';
    // Also check body
    document.body.classList.remove('dark');

    const transitionTimeout = setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none');
    }, 1);
    
    return () => clearTimeout(transitionTimeout);
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme: theme, changeCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeProvider = () => useContext(ThemeContext);
