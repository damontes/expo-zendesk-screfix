import { useAuthentication } from '@/hooks/useAuthentication';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: '',
    name: '',
  });
  const { isAuthenticated, login, logout, user } = useAuthentication();

  const handleChange = (key: string, value: string) => {
    setValues({ ...values, [key]: value });
  };

  const handleSubmit = async () => {
    console.log(values);
    try {
      setLoading(true);
      await login({
        email: values.email,
        name: values.name,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  if (isAuthenticated) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#222222',
          paddingHorizontal: 16,
          rowGap: 16,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
          Hello, {user?.name}!
        </Text>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: '#f05423',
            padding: 12,
            borderRadius: 8,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222222',
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          display: 'flex',
          padding: 8,
          flexDirection: 'column',
          backgroundColor: '#4a4d4a',
          gap: 12,
          width: '100%',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          borderRadius: 8,
          rowGap: 24,
          paddingTop: 16,
          paddingBottom: 24,
          paddingHorizontal: 16,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Welcome back!</Text>
        <TextInput
          placeholder="Email"
          style={{
            backgroundColor: 'transparent',
            padding: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#e0e0e0',
            color: 'white',
          }}
          value={values.email}
          autoCapitalize="none"
          placeholderTextColor="#e0e0e0"
          onChangeText={(value) => handleChange('email', value)}
        />
        <TextInput
          placeholder="Name"
          style={{
            backgroundColor: 'transparent',
            padding: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#e0e0e0',
            color: 'white',
          }}
          value={values.name}
          placeholderTextColor="#e0e0e0"
          onChangeText={(value) => handleChange('name', value)}
        />
        <TouchableOpacity
          style={{
            backgroundColor: loading ? '#ccc' : '#f05423',
            padding: 12,
            borderRadius: 8,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
