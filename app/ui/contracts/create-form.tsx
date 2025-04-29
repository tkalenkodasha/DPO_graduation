'use client';

import { StudentField } from '@/app/lib/definitions';
import Link from 'next/link';
import { CheckIcon, ClockIcon, UserCircleIcon, DocumentTextIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { createContract, ContractState } from '@/app/lib/actions';
import Select from 'react-select';
export default function Form({
                                 students,
                                 fundingSources,
                                 contractTypes,
                                 courses,
                             }: {
    students: StudentField[];
    fundingSources: { id: string; name: string }[];
    contractTypes: { id: string; name: string }[];
    courses: { id: string; name: string }[];
}) {
    const initialState: ContractState = { message: null, errors: {} };
    const [state, formAction] = useActionState(createContract, initialState);
    // Форматируем студентов для react-select
    const studentOptions = students.map((student) => ({
        value: student.id,
        label: `${student.last_name} ${student.first_name} ${student.middle_name || ''}`.trim(),
    }));

    return (
        <form action={formAction}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Выбор студента */}
                <div className="mb-4">
                    <label htmlFor="studentId" className="mb-2 block text-sm font-medium">
                        Выберите студента
                    </label>
                    <div className="relative">
                        <Select
                            id="studentId"
                            name="studentId"
                            options={studentOptions}
                            placeholder="Выберите студента"
                            className="block w-full text-sm"
                            classNamePrefix="react-select"
                            isClearable
                            noOptionsMessage={() => "Студент не найден"}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '0.375rem',
                                    padding: '0.25rem',
                                    backgroundColor: 'white',
                                    paddingLeft: '0.4rem',
                                    '&:hover': {
                                        borderColor: '#d1d5db',
                                    },
                                }),
                                input: (base) => ({
                                    ...base,
                                    paddingLeft: '1.5rem', // Учитываем иконку
                                }),

                                placeholder: (base) => ({
                                    ...base,
                                    paddingLeft: '1.5rem', // Отступ для плейсхолдера
                                    color: '#6b7280', // Цвет плейсхолдера, как в оригинале
                                }),
                                singleValue: (base) => ({
                                    ...base,
                                    paddingLeft: '1.5rem', // Отступ для выбранного значения
                                }),
                                menu: (base) => ({
                                    ...base,
                                    zIndex: 9999,
                                }),
                            }}
                        />
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                    <div id="student-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.student_id?.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>

                </div>

                {/* Номер договора */}
                <div className="mb-4">
                    <label htmlFor="number" className="mb-2 block text-sm font-medium">
                        Номер договора
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <input
                            id="number"
                            name="number"
                            type="text"
                            placeholder="Введите номер договора"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            required
                        />
                        <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                    <div id="number-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.number?.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Тип договора */}
                <div className="mb-4">
                    <label htmlFor="contractTypeId" className="mb-2 block text-sm font-medium">
                        Тип договора
                    </label>
                    <div className="relative">
                        <select
                            id="contractTypeId"
                            name="contractTypeId"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue=""
                            aria-describedby="contract-type-error"
                        >
                            <option value="" disabled>
                                Выберите тип договора
                            </option>
                            {contractTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                        <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                    <div id="contract-type-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.contract_type_id?.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Источник финансирования */}
                <div className="mb-4">
                    <label htmlFor="fundingSourceId" className="mb-2 block text-sm font-medium">
                        Источник финансирования
                    </label>
                    <div className="relative">
                        <select
                            id="fundingSourceId"
                            name="fundingSourceId"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue=""
                            aria-describedby="funding-source-error"
                        >
                            <option value="" disabled>
                                Выберите источник финансирования
                            </option>
                            {fundingSources.map((source) => (
                                <option key={source.id} value={source.id}>
                                    {source.name}
                                </option>
                            ))}
                        </select>
                        <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                    <div id="funding-source-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.funding_source_id?.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Курс */}
                <div className="mb-4">
                    <label htmlFor="courseId" className="mb-2 block text-sm font-medium">
                        Курс
                    </label>
                    <div className="relative">
                        <select
                            id="courseId"
                            name="courseId"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue=""
                            aria-describedby="course-error"
                        >
                            <option value="" disabled>
                                Выберите курс
                            </option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.name}
                                </option>
                            ))}
                        </select>
                        <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                    <div id="course-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.course_id?.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Дата зачисления */}
                <div className="mb-4">
                    <label htmlFor="enrollmentDate" className="mb-2 block text-sm font-medium">
                        Дата зачисления
                    </label>
                    <input
                        id="enrollmentDate"
                        name="enrollmentDate"
                        type="date"
                        className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                        required
                    />
                    <div id="enrollment-date-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.enrollment_date?.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Дата завершения */}
                <div className="mb-4">
                    <label htmlFor="completionDate" className="mb-2 block text-sm font-medium">
                        Дата завершения (опционально)
                    </label>
                    <input
                        id="completionDate"
                        name="completionDate"
                        type="date"
                        className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                    />
                    <div id="completion-date-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.completion_date?.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Дата договора */}
                <div className="mb-4">
                    <label htmlFor="contractDate" className="mb-2 block text-sm font-medium">
                        Дата договора
                    </label>
                    <input
                        id="contractDate"
                        name="contractDate"
                        type="date"
                        className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                        required
                    />
                    <div id="contract-date-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.contract_date?.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Статус */}
                <fieldset>
                    <legend className="mb-2 block text-sm font-medium">Статус договора</legend>
                    <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <input
                                    id="active"
                                    name="status"
                                    type="radio"
                                    value="Активен"
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                    defaultChecked
                                />
                                <label
                                    htmlFor="active"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                                >
                                    Активен <ClockIcon className="h-4 w-4" />
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="completed"
                                    name="status"
                                    type="radio"
                                    value="Завершен"
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="completed"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                                >
                                    Завершен <CheckIcon className="h-4 w-4" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div id="status-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.status?.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </fieldset>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/contracts"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Отмена
                </Link>
                <Button type="submit">Создать договор</Button>
            </div>
        </form>
    );
}