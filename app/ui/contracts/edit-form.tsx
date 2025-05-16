'use client';

import { ContractForm, StudentField } from '@/app/lib/definitions';
import { CheckIcon, ClockIcon, UserCircleIcon, DocumentTextIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateContract } from '@/app/lib/actions';

export default function EditContractForm({
                                           contract,
                                           students,
                                           fundingSources,
                                           contractTypes,
                                           courses,
                                         }: {
  contract: ContractForm;
  students: StudentField[];
  fundingSources: { id: string; name: string }[];
  contractTypes: { id: string; name: string }[];
  courses: { id: string; name: string }[];
}) {
  const updateContractWithId = updateContract.bind(null, contract.id);
  console.log('Contract data:', contract);
  return (
      <form action={updateContractWithId}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* Выбор студента */}
          <div className="mb-4">
            <label htmlFor="studentId" className="mb-2 block text-sm font-medium">
              Выберите студента
            </label>
            <div className="relative">
              <select
                  id="studentId"
                  name="studentId"
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  defaultValue={contract.student_id}
              >
                <option value="" disabled>
                  Выберите студента
                </option>
                {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.last_name} {student.first_name} {student.middle_name}
                    </option>
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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
                  defaultValue={contract.number}
                  placeholder="Введите номер договора"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  required
              />
              <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                  defaultValue={contract.contract_type_id}
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
                  defaultValue={contract.funding_source_id}
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
                  defaultValue={contract.course_id}
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
                defaultValue={contract.enrollment_date}
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                required
            />
          </div>

          {/* Дата завершения */}
          <div className="mb-4">
            <label htmlFor="completionDate" className="mb-2 block text-sm font-medium">
              Дата завершения обучения (предположительно)
            </label>
            <input
                id="completionDate"
                name="completionDate"
                type="date"
                defaultValue={contract.completion_date || ''}
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>

          {/* Дата договора */}
          <div className="mb-4">
            <label htmlFor="contractDate" className="mb-2 block text-sm font-medium">
              Дата составления договора
            </label>
            <input
                id="contractDate"
                name="contractDate"
                type="date"
                defaultValue={contract.contract_date}
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                required
            />
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
                      defaultChecked={contract.status === 'Активен'}
                      className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
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
                      defaultChecked={contract.status === 'Завершен'}
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
          </fieldset>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
              href="/dashboard/contracts"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Отмена
          </Link>
          <Button type="submit">Сохранить изменения</Button>
        </div>
      </form>
  );
}