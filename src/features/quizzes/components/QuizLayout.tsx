import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import type { QuizContextType } from '@/types';

export default function QuizLayout() {
  const [formData, setFormData] = useState<{
    name: string;
    questionNo: number;
    timer: number;
    materials: string[];
  }>({
    name: '',
    questionNo: 5,
    timer: 5,
    materials: [], // now typed as string[]
  });

  return <Outlet context={{ formData, setFormData } satisfies QuizContextType} />;
}
