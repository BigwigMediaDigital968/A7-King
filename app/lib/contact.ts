interface ContactData {
  _id: string;
  referenceId: string;
  name: string;
  whatsappNumber: string;
  telegramLink: string;
  email: string;
  isActive: boolean;
}

export const fetchContact = async (
  referenceId: string
): Promise<ContactData> => {
  const response = await fetch(`/api/contact/${referenceId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch contact");
  }

  const result = await response.json();

  return result.data;
};