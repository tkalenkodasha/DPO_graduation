import Image from 'next/image';
import { UpdateContract, DeleteContract } from '@/app/ui/contracts/buttons';
import ContractStatus from '@/app/ui/contracts/status';
import { formatDateToLocal} from '@/app/lib/utils';
import { fetchFilteredContracts } from '@/app/lib/data';

export default async function ContractsCards({
                                                 query,
                                                 currentPage,
                                             }: {
    query: string;
    currentPage: number;
}) {
    const contracts = await fetchFilteredContracts(query, currentPage);

    return (
        <div className="mt-4 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-1 md:pt-0">
                    <div className="space-y-2">
                        {contracts?.map((contract) => (
                            <div
                                key={contract.id}
                                className="w-full rounded-md bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Image
                                            src={'/students/zaglushka.png'}
                                            className="mr-2 h-6 w-6 rounded-full"
                                            width={24}
                                            height={24}
                                            alt={`${contract.last_name}'s profile picture`}
                                        />
                                        <div>
                                            <p className="text-sm font-medium leading-tight">
                                                {contract.last_name} {contract.first_name} {contract.middle_name}
                                            </p>
                                            <p className="text-xs text-gray-500">{contract.email}</p>
                                        </div>
                                    </div>
                                    <ContractStatus status={contract.status} />
                                </div>
                                <div className="mt-2 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold">Договор №{contract.number}</p>
                                        <p className="text-xs text-gray-600">
                                            {formatDateToLocal(contract.contract_date)}
                                        </p>
                                    </div>
                                    <div className="flex gap-1">
                                        <UpdateContract id={contract.id} />
                                        <DeleteContract id={contract.id} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
