import React, {useEffect} from 'react';
import {
    Appearance,
    SafeAreaView,
    StatusBar,
    useColorScheme, View,
} from 'react-native';
import {ApplicationProvider, IconRegistry, Layout} from "@ui-kitten/components";
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import * as eva from '@eva-design/eva';
import {ThemeContext} from "./src/theme";
import {AppNavigator} from "./src/navigation/AppNavigator";

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const [theme, setTheme] = React.useState(useColorScheme() as string);

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
    };

    const onChangeTheme = (themeId: Appearance.AppearancePreferences) => {
        setTheme(themeId.colorScheme as string)
    }

    useEffect(() => {
        Appearance.addChangeListener(onChangeTheme)
        return () => {
            Appearance.removeChangeListener(onChangeTheme)
        };
    }, []);


    return (
        <View style={{flex: 1}}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
            <IconRegistry icons={EvaIconsPack}/>
            <ThemeContext.Provider value={{theme, toggleTheme}}>
                <ApplicationProvider {...eva} theme={eva[theme]}>
                    <Layout style={{flex: 1}}>
                        <SafeAreaView style={{flex: 1}}>
                            <AppNavigator/>
                        </SafeAreaView>
                    </Layout>
                </ApplicationProvider>
            </ThemeContext.Provider>
        </View>
    );
};

export default App;
