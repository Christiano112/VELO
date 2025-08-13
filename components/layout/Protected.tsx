import { View } from 'react-native';

const ProtectedContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <View>
            {children}
        </View>
    );
}

export default ProtectedContainer;
