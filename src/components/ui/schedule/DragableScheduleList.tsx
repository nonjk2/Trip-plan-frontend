import React, { ReactNode } from 'react';
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  closestCenter,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { switchCategoryIcon } from './DetailedSchedule';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { usePlanContext } from '@/providers/contexts/PlanContext';
import Icons from '@/components/common/Icons';
import { getCategoryCodeById } from '@/utils/placeFormat';

export const SortableItem = ({
  id,
  children,
}: {
  id: number;
  children: ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

const PlacesList = ({
  placesData,
  day,
}: {
  placesData: PlanDetailType[];
  day: number;
}) => {
  const { setPlanData } = usePlanContext();
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeIndex = placesData.findIndex(
        (item) => item.order === active.id
      );
      const overIndex = placesData.findIndex((item) => item.order === over.id);
      const newPlacesData = arrayMove(placesData, activeIndex, overIndex);
      setPlanData((prevPlanData) => {
        const updatedDays = prevPlanData.days.map((dayItem) => {
          if (dayItem.day === day) {
            return {
              ...dayItem,
              detail: newPlacesData,
            };
          }
          return dayItem;
        });

        return {
          ...prevPlanData,
          days: updatedDays,
        };
      });
    }
  };

  const removePlanDays = (items: PlanDetailType) => {
    setPlanData((prevPlanData) => {
      const updatedDays = prevPlanData.days.map((dayItem) => {
        if (dayItem.day === day) {
          return {
            ...dayItem,
            detail: dayItem.detail.filter((item) => item.order !== items.order),
          };
        }
        return dayItem;
      });

      return {
        ...prevPlanData,
        days: updatedDays,
      };
    });
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={placesData.map((item) => item.order)}
        strategy={verticalListSortingStrategy}
      >
        {placesData.map((item, index) => (
          <SortableItem key={item.order + index} id={item.order}>
            <div className=" p-[1.2rem] hover:bg-var-primary-50 transition-all group cursor-default">
              <div className="relative flex gap-[2.4rem] items-start ">
                {switchCategoryIcon(
                  getCategoryCodeById(item.planCategoryNameId) ?? ''
                )}

                <div className="flex flex-col gap-[0.4rem]">
                  <h3 className="text-[2rem] text-black font-semibold leading-[3rem]">
                    {item.place}
                  </h3>
                  <p className="text-[1.6rem] text-black/50 leading-[2.08]">
                    {item.streetAddress}
                  </p>
                </div>
                <div
                  className="absolute right-[1.2rem] top-[1.2rem] hidden group-hover:block z-50 cursor-pointer"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    removePlanDays(item);
                  }}
                >
                  <Icons.Close.CloseIconBg size={28} />
                </div>
                {index !== placesData.length - 1 && (
                  <div className="absolute left-[1.95rem] top-[2rem] h-[calc(100%+4rem)] border-l-[1px] border-dashed border-black"></div>
                )}
              </div>
            </div>
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default PlacesList;
