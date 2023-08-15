import React, { useEffect } from 'react';
import { useBeerStore } from '../../state/beerStore';
import { Grid, GridToolbar } from '@progress/kendo-react-grid';
import { GridColumn as Column } from '@progress/kendo-react-grid/dist/npm/GridColumn';
import { PageChangeEvent, Pager } from '@progress/kendo-react-data-tools';
import { Button } from '@progress/kendo-react-buttons';
import {
  Notification,
  NotificationGroup,
} from '@progress/kendo-react-notification';
import { Fade } from '@progress/kendo-react-animation';

// add page configurator settings for app
export const pageSettings: {
  pageSize: number;
} = {
  pageSize: 10,
};

const BeerList = () => {
  const beers = useBeerStore(state => state.beers);
  const error = useBeerStore(state => state.error);
  const setError = useBeerStore(state => state.setError);
  const page = useBeerStore(state => state.page);
  const highABVOnly = useBeerStore(state => state.highABVOnly);
  const fetchBeers = useBeerStore(state => state.fetchBeers);
  const toggleABVFilter = useBeerStore(state => state.toggleABVFilter);
  const setPage = useBeerStore(state => state.setPage);

  useEffect(() => {
    (async () => {
      try {
        await fetchBeers(page);
        setError(null); // clear previous errors
      } catch (err) {
        setError('Failed to fetch beers. Please try again.');
      }
    })();
  }, [page, highABVOnly]);

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
      <Grid data={beers}>
        <GridToolbar>
          <Button onClick={toggleABVFilter}>
            {highABVOnly ? 'Show All Beers' : 'Show High ABV Beers'}
          </Button>
        </GridToolbar>
        <Column field="name" title="Name" />
        <Column field="abv" title="ABV" />
        <Column field="tagline" title="Tagline" />
      </Grid>
      <Pager
        skip={page * 25 - 25} // This value based on the API's page size
        take={25}
        total={200}
        onPageChange={(event: PageChangeEvent) => {
          const { skip, take } = event;
          setPage(skip / take + 1);
        }}
      />
    </div>
  );
};

export default BeerList;
