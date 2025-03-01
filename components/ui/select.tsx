import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import * as SelectPrimitive from '@rn-primitives/select';
import * as React from 'react';
import { Platform, View } from 'react-native';
import { Check } from '~/lib/icons/Check';
import { cn } from '~/lib/utils';
import colors from 'tailwindcss/colors';
import { ChevronDown } from 'lucide-react-native';

type Option = SelectPrimitive.Option;
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef<SelectPrimitive.TriggerRef, SelectPrimitive.TriggerProps>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-row h-12  items-center text-sm justify-between rounded-md border border-gray-200 bg-white px-3  ',
        props.disabled && ' opacity-50',
        className
      )}
      {...props}
    >
      <View>{children as any}</View>
      <ChevronDown size={16} color={colors.gray["500"]} aria-hidden={true} />
    </SelectPrimitive.Trigger>
  )
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;


const SelectContent = React.forwardRef<
  SelectPrimitive.ContentRef,
  SelectPrimitive.ContentProps & { portalHost?: string }
>(({ className, children, position = 'popper', portalHost, ...props }, ref) => {
  const { open } = SelectPrimitive.useRootContext();
  const sheetRef = React.useRef<BottomSheet>(null);
  const renderBackdrop = React.useCallback(
    (props: any) => <BottomSheetBackdrop
      appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );
  React.useEffect(() => {
    if (open) {
      sheetRef.current?.snapToIndex(0);
    }
    else {
      sheetRef.current?.close();
    }
  }, [open])
  return (
    <SelectPrimitive.Portal hostName={portalHost}>
      <BottomSheet
        snapPoints={["50%", "50%"]}
        handleStyle={{ marginTop: 20 }}
        enablePanDownToClose
        ref={sheetRef}
        backdropComponent={renderBackdrop}>
        <View className=''>
          <BottomSheetScrollView className='px-5' >
            {children}
          </BottomSheetScrollView>
        </View>
      </BottomSheet>

    </SelectPrimitive.Portal>
  );
});
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<SelectPrimitive.LabelRef, SelectPrimitive.LabelProps>(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.Label
      ref={ref}
      className={cn(
        'rounded-xl mt-3 text-gray-500 font-black elevation bg-gray-50 p-3 mb-3',
        className
      )}
      {...props}
    />
  )
);
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<SelectPrimitive.ItemRef, SelectPrimitive.ItemProps>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        'relative web:group flex flex-row w-full border-b py-3 border-b-gray-200 justify-between pb-3',
        props.disabled && 'web:pointer-events-none opacity-50',
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className='text-xl' />
      <View className=' items-center justify-center justify-between flex-row '>
        <SelectPrimitive.ItemIndicator>
          <Check size={16}  strokeWidth={4} color={colors.red["500"]} />
        </SelectPrimitive.ItemIndicator>
      </View>

    </SelectPrimitive.Item>
  )
);
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  SelectPrimitive.SeparatorRef,
  SelectPrimitive.SeparatorProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 h-px bg-muted', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  type Option,
};
