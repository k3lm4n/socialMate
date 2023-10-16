import React, { useContext } from "react";
import classNames from "classnames";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useQuery } from "react-query";
import { ContentEndPoints } from "../../../api/api";
import Loading from "../../Loading";
import { ModalContentDetailsContext } from '../../../context/ModalContentDetailsContext';

export default function ContentDisclosure() {
  const ctx_mdl = useContext(ModalContentDetailsContext);
  const getCourses = useQuery("CoursesContentFILE", async () => {
    const data = await ContentEndPoints.getByDiscriminator("FILE");
    return data;
  });

  const AccordionItem = React.forwardRef<
    HTMLDivElement,
    Accordion.AccordionItemProps
  >(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
      className={classNames(
        "mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b ",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  ));

  const AccordionTrigger = React.forwardRef<
    HTMLButtonElement,
    Accordion.AccordionTriggerProps
  >(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={classNames(
          "text-black shadow-blue-200 hover:bg-white group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <ChevronDownIcon
          className="text-blue-400 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </Accordion.Trigger>
    </Accordion.Header>
  ));

  const AccordionContent = React.forwardRef<
    HTMLDivElement,
    Accordion.AccordionContentProps
  >(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={classNames(
        "text-black bg-gray-50/70 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <div className="py-[15px] px-5">{children}</div>
    </Accordion.Content>
  ));

  return getCourses.isLoading ? (
    <div>
      <Loading />
    </div>
  ) : (
    <Accordion.Root
      className="bg-white w-full rounded-md shadow-[0_2px_10px] shadow-black/5"
      type="single"
      // defaultValue="item-1"
      collapsible
    >
      {getCourses.data?.data.map((item: any) => (
        <AccordionItem value={item.id} key={item.id}>
          <AccordionTrigger>{item.name}</AccordionTrigger>
          {item.count <= 0 ? (
            <AccordionContent>Ainda sem conteúdo</AccordionContent>
          ) : (
            item.contents.map((content: any) => (
              <AccordionContent
                key={content.id}
                onClick={() => {
                  ctx_mdl.handleContent(content.id);
                  ctx_mdl.handle();
                }}
              >
                {content.name}:{" " + content.description}
              </AccordionContent>
            ))
          )}
        </AccordionItem>
      ))}
    </Accordion.Root>
  );
}
