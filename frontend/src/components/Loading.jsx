import CircularProgress from '@mui/material/CircularProgress';

export default function CircularIndeterminate() {
    return (
        <div className='loading-overlay'>
            <CircularProgress aria-label="Loading…" />
        </div>
    );
}
