// This component provides buttons for use in tables that need to be edited or deleted.
import React from 'react'
import Button from './Buttone';
import Link from 'next/link';
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
function EditeButune({editepage,oprnModal}) {
  return (
      <div className="flex flex-row bg-secondary-100 w-auto h-7 rounded-sm cursor-pointer">
        <Button styldisable={true}>
          <Link href={editepage}>
            <PencilSquareIcon className="w-8 h-6 text-secondary-400" />
          </Link>
        </Button>

        <Button styldisable={true} onClick={oprnModal}>
          <TrashIcon className="w-8 h-6 text-red-400" />
        </Button>
      </div>
    );
}

export default EditeButune