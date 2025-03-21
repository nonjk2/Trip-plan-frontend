'use client';
import { usePlanContext } from '@/providers/contexts/PlanContext';
import React, { useEffect, useRef, useState } from 'react';
import { z } from 'zod';

const titleSchema = z
  .string()
  .min(2, '제목은 최소 2자 이상이어야 합니다.')
  .max(10, '제목은 최대 10자까지 입력 가능합니다.');

const PlanDetailsTitleChange = () => {
  const { planData, setPlanData } = usePlanContext();
  const { title } = planData;
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleEdit = () => {
    setTempTitle(title);
    setIsEditing(true);
    setError(null);
  };

  const handleCancel = () => {
    setTempTitle(title);
    setIsEditing(false);
    setError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTempTitle(newTitle);

    try {
      titleSchema.parse(newTitle);
      setError(null);
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        setError(validationError.errors[0].message);
      }
    }
  };

  const handleSave = () => {
    if (error) return;

    setPlanData({ ...planData, title: tempTitle });
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };
  //   const handleBlur = () => {
  //     handleCancel();
  //   };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div className="flex flex-col">
      {error && <span className="text-red-500 text-[1.6rem]">{error}</span>}

      <div className="flex items-center gap-4">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            // onBlur={handleBlur}
            value={tempTitle}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="text-[3.2rem] font-bold border-b border-gray-400 outline-none focus:border-blue-500"
          />
        ) : (
          <span className="leading-[4.8rem] text-[3.2rem] font-bold">
            {title || '제목 없음'}
          </span>
        )}

        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className={`text-[2rem] font-medium ${
                error ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500'
              }`}
              disabled={!!error}
            >
              수정 완료
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-500 text-[2rem] font-medium"
            >
              취소
            </button>
          </>
        ) : (
          <div
            className="text-var-enable-text py-[1.1rem] pl-[1.2rem] cursor-pointer leading-[2.6rem] text-[2rem]"
            onClick={handleEdit}
          >
            편집
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanDetailsTitleChange;
