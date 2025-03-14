
const login = async () => {
  try {
    const { data, error } = await useFetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    });

    if (error.value) {
      errorMsg.value = 'Credenciales inválidas';
      return;
    }

    const token = data.value?.token;
    if (token) {
      localStorage.setItem('access_token', token);
      router.push('/');
    } else {
      errorMsg.value = 'No se recibió un token de autenticación';
    }
  } catch (err) {
    errorMsg.value = 'Error en la conexión';
  }
};
</script>