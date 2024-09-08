export interface Available {
  is_available: boolean;
  times: string[];
}

export interface ModalProps {
  isOpen: boolean;
  selectedDuration: string;
  bookingCount: string;
  hasTourCall: boolean;
  selectedIndex: number;
  availabilityList: Available[];
  onToggle: (index?: number) => void;
}
