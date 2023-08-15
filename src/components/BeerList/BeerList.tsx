import React, { useEffect } from 'react';
import { useBeerStore } from '../../state/beerStore';
import { Grid, GridToolbar } from '@progress/kendo-react-grid';
import { GridColumn as Column } from '@progress/kendo-react-grid/dist/npm/GridColumn';
import { PagerTargetEvent } from '@progress/kendo-react-data-tools';
import { Button } from '@progress/kendo-react-buttons';
import {
  Notification,
  NotificationGroup,
} from '@progress/kendo-react-notification';
import { Fade } from '@progress/kendo-react-animation';
import { GridPageChangeEvent } from '@progress/kendo-react-grid/dist/npm/interfaces/events';

const BeerList = () => {
  const beers = useBeerStore(state => state.beers);
  const error = useBeerStore(state => state.error);
  const setError = useBeerStore(state => state.setError);
  const page = useBeerStore(state => state.page);
  const highABVOnly = useBeerStore(state => state.highABVOnly);
  const fetchBeers = useBeerStore(state => state.fetchBeers);
  const toggleABVFilter = useBeerStore(state => state.toggleABVFilter);
  const setPage = useBeerStore(state => state.setPage);
  const skip = useBeerStore(state => state.skip);
  const setSkip = useBeerStore(state => state.setSkip);
  const take = useBeerStore(state => state.take);
  const setTake = useBeerStore(state => state.setTake);
  const pageSize = useBeerStore(state => state.pageSize);
  const setPageSize = useBeerStore(state => state.setPageSize);

  useEffect(() => {
    (async () => {
      try {
        await fetchBeers(page);
        setError(null); // clear previous errors
      } catch (err) {
        setError('Failed to fetch beers. Please try again.');
      }
    })();
  }, [page, highABVOnly, pageSize]);

  return (
    <div>
      {error && (
        <NotificationGroup
          style={{ bottom: 0, right: 0, position: 'absolute' }}>
          <Fade>
            <Notification
              type={{ style: 'error', icon: true }}
              closable={true}
              onClose={() => setError(null)}>
              <span>{error}</span>
            </Notification>
          </Fade>
        </NotificationGroup>
      )}
      <Grid
        data={beers.slice(0, pageSize)}
        style={{ height: '600px' }}
        skip={skip}
        take={take}
        total={150}
        pageable={{
          buttonCount: 5,
          pageSizes: [5, 10, 15],
          pageSizeValue: pageSize,
        }}
        onPageChange={(event: GridPageChangeEvent) => {
          const targetEvent = event.targetEvent as PagerTargetEvent;
          const { skip, take } = event.page;
          if (targetEvent.value) {
            setPageSize(targetEvent.value);
          }
          setSkip(skip);
          setTake(take);
          setPage(skip / take + 1);
        }}>
        <GridToolbar>
          <Button onClick={toggleABVFilter}>
            {highABVOnly ? 'Show All Beers' : 'Show High ABV Beers'}
          </Button>
        </GridToolbar>
        <Column field="name" title="Name" />
        <Column field="abv" title="ABV" />
        <Column field="tagline" title="Tagline" />
      </Grid>
    </div>
  );
};

export default BeerList;
