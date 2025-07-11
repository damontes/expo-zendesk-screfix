type GenerateTokenProps = {
  keyId: string;
  keySecret: string;
  name: string;
  email: string;
};

async function generateToken(params: GenerateTokenProps) {
  const { keyId, keySecret, name, email } = params;

  const response = await fetch(
    'https://srpvsdugsf.execute-api.us-east-1.amazonaws.com/v1/generateAuthToken',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyId,
        keySecret,
        name: name,
        email: email,
        externalId: 'z3n_home_user_1',
      }),
    },
  ).then((res) => res.json());
  return response.token;
}

export default generateToken;
