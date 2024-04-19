export type InvitateStatus = null | 'accepted' | 'pending' | 'rejected';

export type InviteFrom = {
    _id: string;
    firstName: string | null;
    lastName: string | null;
    imageSrc: string;
};
