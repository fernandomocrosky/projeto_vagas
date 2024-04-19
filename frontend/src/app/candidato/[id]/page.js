'use client';

import { useUser } from '../../_stores/useUser';

export default function CandidatoPage() {
  const { user } = useUser((state) => ({
    user: state.user,
  }));

  return <div>{user.name}</div>;
}
