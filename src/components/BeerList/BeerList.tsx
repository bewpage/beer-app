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
  /**
   * Combine setter functions into one more generic function
   */
  const { updateState } = useBeerStore();
  const beers = useBeerStore(state => state.beers);
  const error = useBeerStore(state => state.error);
  const page = useBeerStore(state => state.page);
  const highABVOnly = useBeerStore(state => state.highABVOnly);
  const fetchBeers = useBeerStore(state => state.fetchBeers);
  const toggleABVFilter = useBeerStore(state => state.toggleABVFilter);
  const skip = useBeerStore(state => state.skip);
  const take = useBeerStore(state => state.take);
  const pageSize = useBeerStore(state => state.pageSize);

  useEffect(() => {
    (async () => {
      await fetchBeers(page);
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
              onClose={() => updateState({ error: null })}>
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
            updateState({ pageSize: targetEvent.value });
          }
          updateState({ skip });
          updateState({ take });
          updateState({ page: skip / take + 1 });
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
