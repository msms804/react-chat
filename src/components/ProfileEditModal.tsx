import React from 'react';
interface ProfileEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleProfileImgChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleEditUsername: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleEditComment: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpload: () => void;
    newUsername: string;
    newComment: string;
}
const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ isOpen, onClose, handleProfileImgChange, handleEditUsername, handleEditComment, handleUpload, newUsername, newComment }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">프로필 편집</h2>
                <input type="file" name="profileImg" accept="image/*" onChange={handleProfileImgChange} />
                <input type='text' name='username' onChange={handleEditUsername} value={newUsername} />
                <input type='text' name='comment' onChange={handleEditComment} value={newComment} />
                <button onClick={handleUpload}>변경</button>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default ProfileEditModal;
