import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import type { FlashcardContextType } from '@/types';

export default function FlashcardLayout() {
  const [formData, setFormData] = useState<{
    name: string;
    type: string;
    materials: string[];
  }>({
    name: '',
    type: '',
    materials: [], // now typed as string[]
  });

  return <Outlet context={{ formData, setFormData } satisfies FlashcardContextType} />;
}
