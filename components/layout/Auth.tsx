import { View } from 'react-native';

const AuthContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <View>
            {children}
        </View>
    );
}

export default AuthContainer;
