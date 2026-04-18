export type TVendorProfile = {
  userId: string;
  farmName: string;
  certificationStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
  farmLocation: string
};
