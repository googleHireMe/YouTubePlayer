import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { YoutubeMediaPlaylist } from '../store/now-playlist/now-playlist.reducer';
import { Observable } from 'rxjs';
import { EchoesState } from '../store/core-store.module';
import { queueVideos, removeVideo, changeFilter, selectVideo, removeAll, selectNext, updateIndexByMedia } from '../store/now-playlist/now-playlist.actions';

@Injectable()
export class NowPlaylistService {
  public playlist$: Observable<YoutubeMediaPlaylist>;

  constructor(
    public store: Store<EchoesState>
  ) {
    this.playlist$ = this.store.select(state => state.nowPlaylist);
  }

  queueVideos(videos: GoogleApiYouTubeVideoResource[]) {
    this.store.dispatch(queueVideos({ videos }));
  }

  removeVideo(media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(removeVideo({media}));
  }

  selectVideo(media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(selectVideo({media}));
  }

  updateFilter(filter: string) {
    this.store.dispatch(changeFilter({ filter }));
  }

  clearPlaylist() {
    this.store.dispatch(removeAll());
  }

  selectNextIndex() {
    this.store.dispatch(selectNext());
  }

  updateIndexByMedia(mediaId: string) {
    this.store.dispatch(updateIndexByMedia({ mediaId }));
  }
}
