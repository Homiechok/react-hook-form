import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

const API_URL = "http://localhost:3000/users";

const sleep = (time) => new Promise(res => setTimeout(() => res(undefined), time))

export const createUser = async (
  userData
) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("Failed to create user");
  return response.json();
};

export const getUsers = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
};

export const getUser = async (id) => {
  await sleep(1000);
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Failed to fetch user");
  return response.json();
};

export const updateUser = async (
  id,
  userData,
) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("Failed to update user");
  return response.json();
};

export const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete user");
};

export function useUser(id) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
  updateUser(data.id, data),
    async onSettled(data) {
    await queryClient.invalidateQueries({
      queryKey: ["user", data?.id],
    });
  },
});
}