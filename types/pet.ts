export interface Pet {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  name: string;
  type: string;
  breed: string | null;
  birth_date: string | null;
  age: number | null;
  weight: number | null;
}
