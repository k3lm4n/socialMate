import { Fragment, useContext, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ModalPostDetailsContext } from "../../../context/ModalPostDetailsContext";
import CommentBox from "../../CommentComponents/CommentBox";
import CommentForm from "../../CommentComponents/CommetForm";
import { XMarkIcon } from "@heroicons/react/20/solid";
import PostViewDetails from "../../PostViewDetails";
// import ModalPostDetails from '../ModalCreateChannel/index';

export default function ModalPostDetails() {
  const ctx = useContext(ModalPostDetailsContext);
  const cancelButtonRef = useRef(null);

  return (
    <>
      {/* {isLoading && <Loading />} */}
      <Transition.Root show={ctx.isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => {
            ctx.handlePost("");
            ctx.handle();
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-7xl">
                  <div className=" grid grid-cols-6 ">
                    <div className="col-span-4">
                      <PostViewDetails id={ctx.post} />
                    </div>
                    <div className="col-span-2">
                      <div className="w-full flex justify-end py-3 px-3">
                        <button
                          type="button"
                          className="mt-3 inline-flex w-3 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => ctx.handle()}
                          ref={cancelButtonRef}
                        >
                          <XMarkIcon className="h-6 w-6" />
                        </button>
                      </div>
                      <CommentBox id={ctx.post} />
                      <CommentForm postId={ctx.post} />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
