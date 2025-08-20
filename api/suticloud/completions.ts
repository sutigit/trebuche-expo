export async function createTitle({ content }: { content: string }): Promise<
  | {
      title: string;
      description: string;
    }
  | undefined
> {
  const url = `${process.env
    .EXPO_PUBLIC_SUTICLOUD_URL!}/api/openai/completions/create-title`;
  const auth_token = `Bearer ${process.env.EXPO_PUBLIC_SUTICLOUD_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: auth_token,
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error sending data:", error);
  }
}

export async function createDescription({
  content,
}: {
  content: string;
}): Promise<
  | {
      title: string;
      description: string;
    }
  | undefined
> {
  const url = `${process.env
    .EXPO_PUBLIC_SUTICLOUD_URL!}/api/openai/completions/create-description`;
  const auth_token = `Bearer ${process.env.EXPO_PUBLIC_SUTICLOUD_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: auth_token,
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error sending data:", error);
  }
}
