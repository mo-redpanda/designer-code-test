'use client';

import { Slot } from 'radix-ui';
import React from 'react';

import { cn } from '../lib/utils';

// Types
type TimelineContextValue = {
  activeStep: number;
  setActiveStep: (step: number) => void;
};

// Context
const TimelineContext = React.createContext<TimelineContextValue | undefined>(undefined);

const useTimeline = () => {
  const context = React.useContext(TimelineContext);
  if (!context) {
    throw new Error('useTimeline must be used within a Timeline');
  }
  return context;
};

// Components
interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  orientation?: 'horizontal' | 'vertical';
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ defaultValue = 1, value, onValueChange, orientation = 'vertical', className, ...props }, ref) => {
    const [activeStep, setInternalStep] = React.useState(defaultValue);

    const setActiveStep = React.useCallback(
      (step: number) => {
        if (value === undefined) {
          setInternalStep(step);
        }
        onValueChange?.(step);
      },
      [value, onValueChange],
    );

    const currentStep = value ?? activeStep;

    return (
      <TimelineContext.Provider value={{ activeStep: currentStep, setActiveStep }}>
        <div
          ref={ref}
          data-slot="timeline"
          className={cn(
            'group/timeline flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col',
            className,
          )}
          data-orientation={orientation}
          {...props}
        />
      </TimelineContext.Provider>
    );
  },
);

Timeline.displayName = 'Timeline';

// TimelineContent
const TimelineContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="timeline-content"
        className={cn('text-muted-foreground text-sm', className)}
        {...props}
      />
    );
  },
);

TimelineContent.displayName = 'TimelineContent';

// TimelineDate
interface TimelineDateProps extends React.HTMLAttributes<HTMLTimeElement> {
  asChild?: boolean;
}

const TimelineDate = React.forwardRef<HTMLTimeElement, TimelineDateProps>(
  ({ asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'time';

    return (
      <Comp
        ref={ref}
        data-slot="timeline-date"
        className={cn(
          'text-muted-foreground mb-1 block text-xs font-medium group-data-[orientation=vertical]/timeline:max-sm:h-4',
          className,
        )}
        {...props}
      />
    );
  },
);

TimelineDate.displayName = 'TimelineDate';

// TimelineHeader
const TimelineHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} data-slot="timeline-header" className={cn(className)} {...props} />;
  },
);

TimelineHeader.displayName = 'TimelineHeader';

// TimelineIndicator
interface TimelineIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const TimelineIndicator = React.forwardRef<HTMLDivElement, TimelineIndicatorProps>(
  ({ asChild = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="timeline-indicator"
        className={cn(
          'border-primary/20 group-data-completed/timeline-item:border-primary absolute size-4 rounded-full border-2 group-data-[orientation=horizontal]/timeline:-top-6 group-data-[orientation=horizontal]/timeline:left-0 group-data-[orientation=horizontal]/timeline:-translate-y-1/2 group-data-[orientation=vertical]/timeline:top-0 group-data-[orientation=vertical]/timeline:-left-6 group-data-[orientation=vertical]/timeline:-translate-x-1/2',
          className,
        )}
        aria-hidden="true"
        {...props}
      >
        {children}
      </div>
    );
  },
);

TimelineIndicator.displayName = 'TimelineIndicator';

// TimelineItem
interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(({ step, className, ...props }, ref) => {
  const { activeStep } = useTimeline();

  return (
    <div
      ref={ref}
      data-slot="timeline-item"
      className={cn(
        'group/timeline-item has-[+[data-completed]]:[&_[data-slot=timeline-separator]]:bg-primary relative flex flex-1 flex-col gap-0.5 group-data-[orientation=horizontal]/timeline:mt-8 group-data-[orientation=horizontal]/timeline:not-last:pe-8 group-data-[orientation=vertical]/timeline:ms-8 group-data-[orientation=vertical]/timeline:not-last:pb-12',
        className,
      )}
      data-completed={step <= activeStep || undefined}
      {...props}
    />
  );
});

TimelineItem.displayName = 'TimelineItem';

// TimelineSeparator
const TimelineSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="timeline-separator"
        className={cn(
          'bg-primary/10 absolute self-start group-last/timeline-item:hidden group-data-[orientation=horizontal]/timeline:-top-6 group-data-[orientation=horizontal]/timeline:h-0.5 group-data-[orientation=horizontal]/timeline:w-[calc(100%-1rem-0.25rem)] group-data-[orientation=horizontal]/timeline:translate-x-4.5 group-data-[orientation=horizontal]/timeline:-translate-y-1/2 group-data-[orientation=vertical]/timeline:-left-6 group-data-[orientation=vertical]/timeline:h-[calc(100%-1rem-0.25rem)] group-data-[orientation=vertical]/timeline:w-0.5 group-data-[orientation=vertical]/timeline:-translate-x-1/2 group-data-[orientation=vertical]/timeline:translate-y-4.5',
          className,
        )}
        aria-hidden="true"
        {...props}
      />
    );
  },
);

TimelineSeparator.displayName = 'TimelineSeparator';

// TimelineTitle
const TimelineTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return <h3 ref={ref} data-slot="timeline-title" className={cn('text-sm font-medium', className)} {...props} />;
  },
);

TimelineTitle.displayName = 'TimelineTitle';

export {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
};
