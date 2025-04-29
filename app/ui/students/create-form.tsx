'use client';

import Link from 'next/link';
import {CalendarIcon, EnvelopeIcon, PhoneIcon, PhotoIcon, UserCircleIcon} from '@heroicons/react/24/outline';
import {Button} from '@/app/ui/button';
import {useActionState} from 'react';
import {createStudent, StudentState} from '@/app/lib/actions';

type SelectOption = { id: string; name: string };

export default function Form({
                                 genders,
                                 educations,
                                 categories,
                                 subcategories,
                             }: {
    genders: SelectOption[];
    educations: SelectOption[];
    categories: SelectOption[];
    subcategories: SelectOption[];
}) {
    const initialState: StudentState = {message: null, errors: {}};
    const [state, dispatch] = useActionState(createStudent, initialState);

    return (
        <form action={dispatch}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Last Name */}
                <div className="mb-4">
                    <label htmlFor="last_name" className="mb-2 block text-sm font-medium">
                        Фамилия
                    </label>
                    <div className="relative">
                        <input
                            id="last_name"
                            name="last_name"
                            type="text"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            required
                        />
                        <UserCircleIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                    {state.errors?.last_name?.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>

                {/* First Name */}
                <div className="mb-4">
                    <label htmlFor="first_name" className="mb-2 block text-sm font-medium">
                        Имя
                    </label>
                    <div className="relative">
                        <input
                            id="first_name"
                            name="first_name"
                            type="text"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            required
                        />
                        <UserCircleIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                    {state.errors?.first_name?.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>

                {/* Middle Name */}
                <div className="mb-4">
                    <label htmlFor="middle_name" className="mb-2 block text-sm font-medium">
                        Отчество
                    </label>
                    <div className="relative">
                        <input
                            id="middle_name"
                            name="middle_name"
                            type="text"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <UserCircleIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        Почта
                    </label>
                    <div className="relative">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <EnvelopeIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                    {state.errors?.email?.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>

                {/* Phone */}
                <div className="mb-4">
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                        Номер телефона (optional)
                    </label>
                    <div className="relative">
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <PhoneIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                </div>

                {/* Date of Birth */}
                <div className="mb-4">
                    <label htmlFor="date_of_birth" className="mb-2 block text-sm font-medium">
                        Дата рождения
                    </label>
                    <div className="relative">
                        <input
                            id="date_of_birth"
                            name="date_of_birth"
                            type="date"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            required
                        />
                        <CalendarIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                    {state.errors?.date_of_birth?.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>

                {/* Gender */}
                <div className="mb-4">
                    <label htmlFor="gender_id" className="mb-2 block text-sm font-medium">
                        Пол
                    </label>
                    <select
                        id="gender_id"
                        name="gender_id"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                        required
                    >
                        <option value="">Select Gender</option>
                        {genders.map((gender) => (
                            <option key={gender.id} value={gender.id}>
                                {gender.name}
                            </option>
                        ))}
                    </select>
                    {state.errors?.gender_id?.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>

                {/* Education */}
                <div className="mb-4">
                    <label htmlFor="education_id" className="mb-2 block text-sm font-medium">
                        Образование
                    </label>
                    <select
                        id="education_id"
                        name="education_id"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                        required
                    >
                        <option value="">Select Education</option>
                        {educations.map((education) => (
                            <option key={education.id} value={education.id}>
                                {education.name}
                            </option>
                        ))}
                    </select>
                    {state.errors?.education_id?.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>

                {/* Category */}
                <div className="mb-4">
                    <label htmlFor="category_id" className="mb-2 block text-sm font-medium">
                        Категория
                    </label>
                    <select
                        id="category_id"
                        name="category_id"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Subcategory */}
                <div className="mb-4">
                    <label htmlFor="subcategory_id" className="mb-2 block text-sm font-medium">
                        Субкатегория
                    </label>
                    <select
                        id="subcategory_id"
                        name="subcategory_id"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                    >
                        <option value="">Select Subcategory</option>
                        {subcategories.map((subcategory) => (
                            <option key={subcategory.id} value={subcategory.id}>
                                {subcategory.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Photo URL */}
                <div className="mb-4">
                    <label htmlFor="photo_url" className="mb-2 block text-sm font-medium">
                        Photo URL (optional)
                    </label>
                    <div className="relative">
                        <input
                            id="photo_url"
                            name="photo_url"
                            type="text"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <PhotoIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                </div>
            </div>

            {state.message && (
                <p className="mt-2 text-sm text-red-500">{state.message}</p>
            )}

            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/students"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Отмена
                </Link>
                <Button type="submit">Создать студента</Button>
            </div>
        </form>
    );
}