import Image from 'next/image';
import { UpdateContract, DeleteContract } from '@/app/ui/contracts/buttons';
import InvoiceStatus from '@/app/ui/contracts/status';
import { formatDateToLocal} from '@/app/lib/utils';
import { fetchFilteredContracts } from '@/app/lib/data';

export default async function ContractsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const contracts = await fetchFilteredContracts(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="">
            {contracts?.map((contract) => (
              <div
                key={contract.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={contract.photo_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${contract.last_name}'s profile picture`}
                      />
                      <p>{contract.last_name} {contract.first_name} {contract.middle_name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{contract.email}</p>
                  </div>
                  <InvoiceStatus status={contract.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      Договор № {contract.number}
                    </p>
                    <p>{formatDateToLocal(contract.contract_date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateContract id={contract.id} />
                    <DeleteContract id={contract.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Студент
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Номер договора
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Дата заключения договора
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Статус
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {contracts?.map((contract) => (
                <tr
                  key={contract.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={contract.photo_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${contract.last_name}'s profile picture`}
                      />
                      <p>{contract.last_name} {contract.first_name} {contract.middle_name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {contract.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {contract.number}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(contract.contract_date )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={contract.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateContract id={contract.id} />
                      <DeleteContract id={contract.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
