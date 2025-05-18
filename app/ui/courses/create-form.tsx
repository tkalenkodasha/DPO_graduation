'use client';

import Link from 'next/link';
import {UserCircleIcon, ClockIcon, BookOpenIcon, AcademicCapIcon} from '@heroicons/react/24/outline';
import {Button} from '@/app/ui/button';
import { useFormState } from 'react-dom';
import {createCourse, CourseState} from '@/app/lib/actions';

type SelectOption = { id: string; name: string };

export default function Form({
                                 programs,
                             }: {
    programs: SelectOption[];
}) {
    const initialState: CourseState = {message: null, errors: {}};
    const [state, dispatch] = useFormState(createCourse, initialState);

    return (
        <form action={dispatch}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Наименование курса
                    </label>
                    <div className="relative">
                        <input
                            id="name"
                            name="name"
                            type="text"
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

                {/* Academic Hours */}
                <div className="mb-4">
                    <label htmlFor="academic_hours" className="mb-2 block text-sm font-medium">
                        Количество академических часов
                    </label>
                    <div className="relative">
                        <input
                            id="academic_hours"
                            name="academic_hours"
                            type="number"
                            min="1"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            required
                        />
                        <ClockIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                    {state.errors?.academic_hours?.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>

                {/* Program */}
                <div className="mb-4">
                    <label htmlFor="program_id" className="mb-2 block text-sm font-medium">
                        Тип программы
                    </label>
                    <div className="relative">
                        <select
                            id="program_id"
                            name="program_id"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            required
                        >
                            <option value="">Выберите тип программы</option>
                            {programs.map((program) => (
                                <option key={program.id} value={program.id}>
                                    {program.name}
                                </option>
                            ))}
                        </select>
                        <AcademicCapIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                    {state.errors?.program_id?.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="mb-2 block text-sm font-medium">
                        Описание курса
                    </label>
                    <div className="relative">
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <BookOpenIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                </div>
            </div>

            {state.message && (
                <p className="mt-2 text-sm text-red-500">{state.message}</p>
            )}

            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/courses"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Отмена
                </Link>
                <Button type="submit">Создать курс</Button>
            </div>
        </form>
    );
}