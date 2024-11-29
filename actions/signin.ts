export const signinx = async (email: string, password: string) => {
  try {
    const py = {
      email: email,
      password: password,
    };
    const res = await fetch(`${process.env.BACK_URL}signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(py),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const result = await res.json();
    return result.data;
  } catch (error) {
    return { status: "error", message: "error" };
  }
};
