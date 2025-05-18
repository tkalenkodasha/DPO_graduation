'use client';

import {CourseForm} from '@/app/lib/definitions';
import {PhoneIcon,UserCircleIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {Button} from '@/app/ui/button';
import {updateCourse} from '@/app/lib/actions';
import {useActionState} from 'react';

type SelectOption = { id: string; name: string };

export default function EditCourseForm({
                                           course,
                                           programs,

                                       }: {
    course: CourseForm;
    programs: SelectOption[];

}) {
    const updateCourseWithId = updateCourse.bind(null, course.id);
    const [state, dispatch] = useActionState(updateCourseWithId, {errors: {}, message: null});

    return (
        <form action={dispatch}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Last Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Наименование курса *
                    </label>
                    <div className="relative">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            defaultValue={course.name}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            required
                        />
                        <UserCircleIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                    {state.errors?.name?.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>

                {/* hours */}
                <div className="mb-4">
                    <label htmlFor="academic_hours" className="mb-2 block text-sm font-medium">
                        Количество академических часов
                    </label>
                    <div className="relative">
                        <input
                            id="academic_hours"
                            name="academic_hours"
                            type="number"
                            defaultValue={course.academic_hours}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <PhoneIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                </div>

                {/* program */}
                <div className="mb-4">
                    <label htmlFor="program_id" className="mb-2 block text-sm font-medium">
                        Тип программы *
                    </label>
                    <select
                        id="program_id"
                        name="program_id"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                        defaultValue={course.program_id}
                        required
                    >
                        <option value="">Выберите тип программы</option>
                        {programs.map((program) => (
                            <option key={program.id} value={program.id}>
                                {program.name}
                            </option>
                        ))}
                    </select>
                    {state.errors?.program_id?.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>



                {/* description */}
                <div className="mb-4">
                    <label htmlFor="description" className="mb-2 block text-sm font-medium">
                        Описание курса
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        defaultValue={course.description}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>


            </div>

            {state.message && (
                <p className="mt-2 text-sm text-red-500">{state.message}</p>
            )}

            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/studentsgrid"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Отмена
                </Link>
                <Button type="submit">Сохранить изменения</Button>
            </div>
        </form>
    );
}