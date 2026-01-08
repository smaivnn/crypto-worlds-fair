import AnnouncementBarView from './views/AnnouncementBarView';

const AnnouncementBar = () => {
    const message = Array.from(
        { length: 3 },
        () => 'Free preview available · No sign-up · Private',
    );

    const announcementBarProps = { message };
    return <AnnouncementBarView {...announcementBarProps} />;
};

export default AnnouncementBar;
