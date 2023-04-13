package com.a403.mmixx.music.model.entity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.a403.mmixx.music.model.QuerydslOrderByNull;
import com.a403.mmixx.music.model.dto.MusicCondition;
import com.a403.mmixx.music.model.dto.MusicListResponseDto;
import com.a403.mmixx.music.model.dto.QMusicListResponseDto;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

import static com.a403.mmixx.music.model.entity.QMusic.*;

@RequiredArgsConstructor
public class MusicRepositoryCustomImpl implements MusicRepositoryCustom {
	private final JPAQueryFactory queryFactory;

	@Override
	public Page<MusicListResponseDto> getMusicListByCondition(Integer user_seq, MusicCondition condition, Pageable pageable) {
		
		List<MusicListResponseDto> content = queryFactory
			.select(new QMusicListResponseDto(music))
			.from(music)
			.where(musicUser(user_seq), musicNameContains(condition.getQuery()), musicMixedIs(condition.getFilter()))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.orderBy(orderByCondition(condition.getOrder()))
			.fetch();

		Long resultCount = queryFactory
			.select(music.count())
			.from(music)
			.where(musicNameContains(condition.getQuery()), musicMixedIs(condition.getFilter()))
			.fetchOne();
		resultCount = (resultCount == null) ? 0 : resultCount;

		return new PageImpl<>(content, pageable, resultCount);
	}

	private BooleanExpression musicUser(Integer user_seq) {
		return music.user.userSeq.eq(user_seq);
	}

	private BooleanExpression musicNameContains(String query) {
		return ((query == null) || (query.length() == 0)) ? null : music.musicName.contains(query);
	}

	private BooleanExpression musicMixedIs(String filter) {
		
		if(filter == null || filter.length() == 0){ // isEmpty(filter)
			return null;
		}

		if(filter.equals("mix")) {
			return music.mixed.isNotNull();
		}
		
		if(filter.equals("inst")) {
			return music.inst.isNotNull();
		}

		if(filter.equals("origin")) {
			return music.inst.isNull().and(music.mixed.isNull());
		}

		return null;
	}

	private OrderSpecifier<?> orderByCondition(final String order) {

		if (order == null || order.length() < 4) {
			return QuerydslOrderByNull.getDefault();
		}

		// 1: ASC, 2: DESC
		// title1/2 -> musicName, date1/2 -> musicSeq, length1/2 -> musicLength
		String orderType = order.substring(order.length() - 1);
		String orderName = new StringTokenizer(order, orderType).nextToken();
		int index = Integer.parseInt(orderType) - 1;

		if(index != 0 && index != 1) {
			return QuerydslOrderByNull.getDefault();
		}


		final Order orderTypes[] = {Order.ASC, Order.DESC};

		Map<String, Expression> orderNameMap = new HashMap<>();
		orderNameMap.put("title", music.musicName);
		orderNameMap.put("date", music.musicSeq);
		orderNameMap.put("length", music.musicLength);

		final Expression orderTarget = orderNameMap.get(orderName);

		if(orderTarget == null){
			return QuerydslOrderByNull.getDefault();
		}

		return new OrderSpecifier<>(orderTypes[index], orderTarget);

	}
}
